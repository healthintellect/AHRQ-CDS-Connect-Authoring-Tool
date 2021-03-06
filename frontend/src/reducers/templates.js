import * as types from '../actions/types';

const defaultState = {
  templates: null,
  loadTemplates: { isLoadingTemplates: null, loadTemplatesStatus: null }
};

export default function templates(state = defaultState, action) {
  switch (action.type) {
    case types.TEMPLATES_REQUEST:
      return {
        ...state,
        loadTemplates: { isLoadingTemplates: true, loadTemplatesStatus: null }
      };
    case types.LOAD_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: action.templates,
        loadTemplates: { isLoadingTemplates: false, loadTemplatesStatus: 'success' }
      };
    case types.LOAD_TEMPLATES_FAILURE:
      return {
        ...state,
        loadTemplates: { isLoadingTemplates: false, loadTemplatesStatus: 'failure' }
      };
    default:
      return state;
  }
}
