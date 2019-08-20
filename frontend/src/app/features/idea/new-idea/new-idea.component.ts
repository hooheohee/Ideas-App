import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { IdeaDTO } from "@app/models/idea";
import { AppState } from "@app/store/app-store.module";
import { CreateIdea } from "../state/idea.action";

@Component({
  selector: "app-new-idea",
  templateUrl: "./new-idea.component.html",
  styleUrls: ["./new-idea.component.scss"]
})
export class NewIdeaComponent {
  constructor(private store: Store<AppState>) {}

  submit(e: IdeaDTO) {
    this.store.dispatch(new CreateIdea(e));
  }
}
