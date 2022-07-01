import {ISortVariants} from "../../../../../common/types/ISortVariants";
import {IFilter} from "../../../../../common/types/IFilter";

export interface IFilterComponent {
    onChangeSearchableText: (answer: string) => void;
    onChangeSorting: (sortVariant: ISortVariants) => void;
    filter: IFilter;
}