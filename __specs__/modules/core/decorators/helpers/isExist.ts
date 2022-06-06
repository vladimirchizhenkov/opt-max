import { getElements } from '@Core/decorators/api/parseSelector';

type ExistenceChecker = (params: { root: Element | Document; selector: string }) => boolean;

export const isElementExist: ExistenceChecker = ({ selector, root }) => !!getElements(root, selector).length;
