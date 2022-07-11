import {ISortVariant} from "../../../types/ISortVariant";
import {IFilter} from "../../../types/IFilter";

export interface IFilterComponent {
    onChangeSearchableText: (answer: string) => void;
    onChangeSorting: (sortVariant: ISortVariant) => void;
    filter: IFilter;
    sortVariants: ISortVariant[];
}