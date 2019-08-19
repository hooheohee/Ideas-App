import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { tap, mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { ApiService } from "@app/services/api.service";
import { RemoveError, AddError } from "@app/store/actions/errors.action";
import {
  LoadIdeas,
  IdeaActions,
  LoadIdea,
  LoadIdeasSuccess,
  LoadIdeaSuccess,
  CreateIdea,
  CreateIdeaSuccess,
  UpdateIdea,
  UpdateIdeaSuccess,
  DeleteIdea,
  DeleteIdeaSuccess,
  UpvoteIdea,
  DownvoteIdea
} from "./idea.action";
import { AppState } from ".";
import { Router } from "@angular/router";
import { Idea } from "@app/models/idea";

@Injectable()
export class IdeaEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private api: ApiService,
    private router: Router
  ) {}

  @Effect()
  loadIdeas$: Observable<Action> = this.action$.pipe(
    ofType<LoadIdeas>(IdeaActions.LOAD_IDEAS),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.getIdeas().pipe(
        map((ideas: Idea[]) => new LoadIdeasSuccess(ideas)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  loadIdea$: Observable<Action> = this.action$.pipe(
    ofType<LoadIdea>(IdeaActions.LOAD_IDEA),
    tap(() => this.store.dispatch(new RemoveError())),
    withLatestFrom(this.store),
    mergeMap(([action, state]: [LoadIdea, AppState]) => {
      const idea = state.ideas.ideas[action.payload];
      if (idea) {
        return of(new LoadIdeaSuccess());
      } else {
        return this.api.getIdea(action.payload).pipe(
          mergeMap((res: Idea) => of(new LoadIdeaSuccess(res))),
          catchError(err => of(new AddError(err.error)))
        );
      }
    })
  );

  @Effect()
  createIdeas$: Observable<Action> = this.action$.pipe(
    ofType<CreateIdea>(IdeaActions.CREATE_IDEA),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.createIdea(action.payload).pipe(
        map((idea: Idea) => new CreateIdeaSuccess(idea)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  updateIdeas$: Observable<Action> = this.action$.pipe(
    ofType<UpdateIdea>(IdeaActions.UPDATE_IDEA),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.updateIdea(action.payload.id, action.payload).pipe(
        map((idea: Idea) => new UpdateIdeaSuccess(idea)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  deleteIdeas$: Observable<Action> = this.action$.pipe(
    ofType<DeleteIdea>(IdeaActions.DELETE_IDEA),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.deleteIdea(action.payload).pipe(
        map((idea: Idea) => new DeleteIdeaSuccess(idea.id)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  upvoteIdeas$: Observable<Action> = this.action$.pipe(
    ofType<UpvoteIdea>(IdeaActions.UPVOTE_IDEA),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.upvote(action.payload).pipe(
        map((idea: Idea) => new UpdateIdeaSuccess(idea)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  downvoteIdeas$: Observable<Action> = this.action$.pipe(
    ofType<DownvoteIdea>(IdeaActions.DOWNVOTE_IDEA),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(action =>
      this.api.downvote(action.payload).pipe(
        map((idea: Idea) => new UpdateIdeaSuccess(idea)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect({ dispatch: false })
  createIdeaRedirect$ = this.action$.pipe(
    ofType<CreateIdeaSuccess>(IdeaActions.CREATE_IDEA_SUCCESS),
    tap(action => this.router.navigate(["/ideas", action.payload.id]))
  );
}
