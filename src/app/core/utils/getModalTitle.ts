import { ModalType } from '../models/modal.models';

export function getModalTitle(modalType: ModalType | null, category: 'task' | 'note' | null): string {
	console.log(modalType, category);
	if (modalType === null || category === null) return '';

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
