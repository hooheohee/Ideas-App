import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UIModule } from "@app/ui.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ideaReducer } from "@app/features/idea/state/idea.reducer";
import { IdeaEffects } from "./state/idea.effects";
import { IdeasComponent } from "./ideas/ideas.component";
import { IdeaComponent } from './ideas/idea/idea.component';

const routes: Routes = [{ path: "", component: IdeasComponent }];

@NgModule({
  declarations: [IdeasComponent, IdeaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UIModule,
    StoreModule.forFeature("ideas", ideaReducer),
    EffectsModule.forFeature([IdeaEffects])
  ]
})
export class IdeaModule {}
