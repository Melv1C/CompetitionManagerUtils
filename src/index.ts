import { BaseData } from "./DataClass/BaseData";
import Athlete from "./DataClass/Athlete";
import Event from "./DataClass/Event";
import Category from "./DataClass/Category";
import Competition from "./DataClass/Competition";
import Competition_Event from "./DataClass/Competition_Event";
import Param from "./DataClass/Param";
import {Result, ResultDetail} from "./DataClass/Result";
import User from "./DataClass/User";

export { BaseData, Athlete, Event, Category, Competition, Competition_Event, Param, Result, ResultDetail, User }

import { getCategory } from "./getCategory";
export { getCategory }

import { compareResult, isResultValid, formatResult } from "./resultUtils";
export { compareResult, isResultValid, formatResult } 