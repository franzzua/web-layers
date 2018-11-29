import {wire} from "hyperhtml";
import {utcToday} from "@so/utils";
import {IEvents, IState} from "./date-range";
import {Moment} from "moment";

module.exports = (html, state: IState, events: IEvents) => html`
 <div row layout horizontal justified>
        <so-slider value="${state.to}" onchange="${e => events.to(e.value)}"></so-slider>
 ${new Array(20).fill(1).map((_, i) => i * 3).map(pTime => wire()`
        <div item selected="${Math.abs(pTime - state.pTime) < 1.5 ? "" : undefined}"
                     onclick="${_ => events.to((pTime / 3 + .5) / 20)}"
                     flex center-center layout>
            +${pTime}
        </div>
    `)}
    </div>
   <div row layout horizontal justified>
      <so-slider value="${state.from}" onchange="${e => events.from(e.value)}"></so-slider>
 ${new Array(20).fill(1)
    .map((_, i) => ([utcToday().add(-24 + 6 * i, 'hour'), i]))
    .map(([obsTime, i]: [Moment, number]) => wire()`
        <div item flex  center-center layout selected="${Math.abs(obsTime.diff(state.obsTime, 'hour')) < 3 ? "" : undefined}"
             onclick="${_ => events.from((i + .5) / 20)}">
            ${obsTime.format("YY-MM-DD HH:mm")}
        </div>
    `)}
 </div>
`;
