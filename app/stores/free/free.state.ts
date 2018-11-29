import {Moment} from "@so/utils";

export interface IFreeState {
    ObsTime: Moment;
    Prediction: number;
    Layers: string[];
    Spaces: string[];
    Templates: { label: string, template: string }[];
    Levels: { Type: number; Value: number; }[];
}
