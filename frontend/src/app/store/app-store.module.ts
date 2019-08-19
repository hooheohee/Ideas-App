import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule, ActionReducerMap } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { errorReducer, ErrorState } from "@app/store/reducers/errors.reducer";
import { authReducer, AuthState } from "@app/store/reducers/auth.reducer";
import { AuthEffects } from "@app/store/effects/auth.effects";
import {
  RouterReducerState,
  routerReducer,
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { RouterStateUrl, CustomSerializer } from "./reducers/router.reducer";

export interface AppState {
  error: ErrorState;
  auth: AuthState;
  router?: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer,
  router: routerReducer
};

export const effects = [AuthEffects];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ]
})
export class AppStoreModule {}
