import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state";
import { selectCurrentIdea } from "../state/idea.selector";
import { Subscription } from "rxjs";
import { Idea } from "@app/models/idea";

@Component({
  selector: "app-selected-idea",
  templateUrl: "./selected-idea.component.html",
  styleUrls: ["./selected-idea.component.scss"]
})
export class SelectedIdeaComponent implements OnInit {
  private subscription: Subscription;
  idea: Idea;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select(selectCurrentIdea)
      .subscribe(val => (this.idea = val));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
