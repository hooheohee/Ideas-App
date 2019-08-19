import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IdeaState } from ".";
import { Entity } from "@app/models/entity";
import { Idea } from "@app/models/idea";

export const selectIdeaState = createFeatureSelector<IdeaState>("ideas");

export const selectAllIdeas = createSelector(
  selectIdeaState,
  (ideaState: IdeaState) => {
    const { ideas }: { ideas: Entity<Idea> } = ideaState;
    return Object.keys(ideas).map(id => ideas[id]);
  }
);
