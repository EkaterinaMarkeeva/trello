import Controller from "./controller";
import StateService from "./stateServer";

const stateService = new StateService(localStorage);
const ctr = new Controller(stateService);

ctr.init();