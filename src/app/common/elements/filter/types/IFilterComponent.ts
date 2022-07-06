import {ISortVariants} from "../../../types/ISortVariants";
import {IFilter} from "../../../types/IFilter";

export interface IFilterComponent {
    onChangeSearchableText: (answer: string) => void;
    onChangeSorting: (sortVariant: ISortVariants) => void;
    filter: IFilter;
}