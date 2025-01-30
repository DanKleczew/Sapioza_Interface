import {PaperMetaData} from "./paper-meta-data";

export interface FilteredPaperMetaData {
  paperId: number;
  queriedPaperInfosDTO: PaperMetaData;
}
