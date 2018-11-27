import {Moment} from "@gm/isomorphic-core";

export interface IFreeState {
    ObsTime: Moment;
    Prediction: number;
    Layers: string[];
    Spaces: string[];
    Templates: { label: string, template: string }[];
    Levels: { Type: number; Value: number; }[];
}
