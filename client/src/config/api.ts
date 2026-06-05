// API URL from environment, normalized to avoid accidental double slashes.
const rawApiBaseUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export const apiUrl = (path: string): string => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${API_BASE_URL}${normalizedPath}`;
};

export const parseApiResponse = async (response: Response): Promise<unknown> => {
	const contentType = response.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		return response.json();
	}

	return response.text();
};

export const getApiErrorMessage = (
	response: Response,
	payload: unknown,
): string => {
	if (
		payload &&
		typeof payload === "object" &&
		"message" in payload &&
		typeof (payload as { message: unknown }).message === "string"
	) {
		return (payload as { message: string }).message;
	}

	if (typeof payload === "string") {
		const trimmed = payload.trim();

		if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
			return "Server returned HTML instead of JSON. Verify VITE_API_URL points to your API and does not end with a trailing slash.";
		}

		if (trimmed.length > 0) {
			return trimmed;
		}
	}

	return `Request failed with status ${response.status}`;
};