// import $ from "jquery";
// import "jquery-validation-unobtrusive";
require("es6-promise").polyfill();
import "core-js/features/number/is-nan";
import svg4everybody from "svg4everybody";
import objectFitImages from "object-fit-images";
import picturefill from "picturefill";
import objectFit from "./modules/objectFit";
import accordions from "./modules/accordions";

svg4everybody();
picturefill();
accordions();
objectFitImages();
objectFit();
