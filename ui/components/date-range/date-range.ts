import {ValueEvent} from "@so/ui";
import {HyperComponent, Component} from "@so/ui";
import {combineLatest, filter, map, merge, startWith} from "rx";
import {Injectable} from "@so/di";
import {utc, utcToday} from "@so/utils";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Injectable()
@Component({
    name: 'date-range',
    template: require('./date-range.tsx'),
    style: require('./date-range.less'),
    observedAttributes: ["obstime", "ptime"]
})
export class DateRange extends HyperComponent<IState, IEvents> {

    private ToChanges$ = this.Events$.pipe(
        filter(e => e.type == "to"),
        map(e => e.args[0]),
        startWith(0.8)
    );

    private FromChanges$ = this.Events$.pipe(
        filter(e => e.type == "from"),
        map(e => e.args[0]),
        startWith(0.2)
    );

    private Inner$ = combineLatest(this.FromChanges$, this.ToChanges$).pipe(
        map(([from, to]) => ({
            from,
            to,
            pTime: Math.floor(to * 20) * 3,
            obsTime: utcToday().add(Math.floor(from * 20) * 6 - 24, 'hour')
        })),
    );


    private Outer$ = this.Attributes$.pipe(
        filter(({obstime, ptime}) => obstime !== null && ptime !== null),
        map(({obstime, ptime}) => ({
            obsTime: utc(obstime),
            pTime: ptime,
            to: (ptime / 3 + .5) / 20,
            from: ((utcToday().diff(utc(obstime), 'hour') + 24) / 6 + .5) / 20
        }))
    );

    public State$ = merge(this.Inner$, this.Outer$);

    private Subscr = this.State$.pipe(
        map(s => s.obsTime.toISOString()),
        distinctUntilChanged(),
        debounceTime(200)
    ).subscribe(obsTime => {
        if (this.element) {
            this.element.dispatchEvent(new ValueEvent('change-obstime', obsTime));
        }
    });


    private Subscr2 = this.State$.pipe(
        map(s => s.pTime),
        distinctUntilChanged(),
        debounceTime(200)
    ).subscribe(pTime => {
        if (this.element) {
            this.element.dispatchEvent(new ValueEvent('change-ptime', pTime));
        }
    });
}

export interface IState {
    from;
    to;
    obsTime;
    pTime;
}

export interface IEvents {
    from;
    to;
}