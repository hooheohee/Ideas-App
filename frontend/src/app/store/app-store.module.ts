import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule, ActionReducerMap } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { errorReducer, ErrorState } from "./reducers/errors.reducer";

export interface AppState {
  error: ErrorState;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ]
})
export class AppStoreModule {}
