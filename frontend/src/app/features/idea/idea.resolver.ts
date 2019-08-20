import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "./state";
import { LoadIdea } from "./state/idea.action";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";

@Injectable()
export class IdeaResolver implements Resolve<Subscription> {
  constructor(private store: Store<AppState>) {}

  resolve() {
    return this.store
      .select(state => state.router.state.params.id)
      .pipe(take(1))
      .subscribe(id => this.store.dispatch(new LoadIdea(id)));
  }
}
