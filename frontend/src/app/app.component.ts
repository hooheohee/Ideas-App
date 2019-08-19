import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app-store.module";
import { SetInitialUser } from "./store/actions/auth.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ideas-app-frontend";

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new SetInitialUser());
  }
}
