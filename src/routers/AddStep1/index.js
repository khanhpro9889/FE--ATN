import { ADD_STEP_1 as path } from '../../constants/Path';
import { loadable } from '../../utils/router';

export default {
    path,
    component: loadable(() => import('./AddStep1'))
}