import { ModalType } from '../models/modal.models';

export function getModalTitle(modalType: ModalType, category: 'task' | 'note') {
	let title = '';
	const categoryName = category === 'note' ? ` note` : ` task`;

	if (modalType === ModalType.create) {
		title = 'Napravi';
	} else if (modalType === ModalType.update) {
		title = 'Azuriraj';
	} else {
		title = 'Obrisi';
	}
	return title + categoryName;
}
