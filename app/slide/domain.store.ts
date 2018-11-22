import {Domain, ISlideState} from "@gm/isomorphic-domain";
import {Injectable} from "@decorators/di";
import {ObservableStore, RootStore} from "store-rxjs";

@Injectable()
export class DomainStore extends ObservableStore<ISlideState[]> {

  constructor(rootStore: RootStore,
              protected domain: Domain) {
    super(rootStore, "domain");
    this.domain.State$
      .subscribe(s => this.Actions.Init(s));
    this.domain.Actions.dispatch = (old => (action) => {
      this.Actions.Action(action);
      old(action);
    })(this.domain.Actions.dispatch)

  }


}
