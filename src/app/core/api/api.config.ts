import { environment } from '../../../environments/environment';

const authPrefix = 'auth';
const taskPrefix = 'taskovi';
export const API_CONFIG = {
	baseUrl: environment.apiUrl,

	auth: {
		login: `${authPrefix}/login`,
		refresh: `${authPrefix}/refresh`,
		logout: `${authPrefix}/logout`,
		me: `${authPrefix}/me`,
	},
	taskovi: {
		sviTaskovi: `${taskPrefix}/svi-taskovi`,
		byId: (id: number) => `${taskPrefix}/${id}`,
		napraviTask: `${taskPrefix}/napravi`,
	},
} as const;
