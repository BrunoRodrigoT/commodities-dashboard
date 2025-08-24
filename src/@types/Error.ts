interface IAPIErrorResponse {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
}

export default IAPIErrorResponse
