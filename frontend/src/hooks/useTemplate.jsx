import { useEffect, useState } from "react";
import {
    useReadTemplatesMutation,
    useReadTemplateMutation,
    useCreateTemplateMutation,
    useDeleteTemplateMutation,
    useUpdateTemplateMutation,
} from "../Api/Template";

export function useFetchTemplate(id) {
    const [readTemplate] = useReadTemplateMutation();
    const [templateData, setTemplateData] = useState(null);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await readTemplate(id);
                console.log(`Use Get Template By Id : ${JSON.stringify(response, null, 2)}`);
                setTemplateData(response.data);
            } catch (error) {
                console.error("Error fetching template data:", error);
            }
        };
        fetchTemplate();
    }, [id, readTemplate]);

    return templateData;
}

export function useFetchTemplates() {
    const [readTemplates] = useReadTemplatesMutation();
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await readTemplates();
                console.log(`Use Get All Templates : ${JSON.stringify(response, null, 2)}`);
                setTemplates(response.data);
            } catch (error) {
                console.error("Error fetching templates data:", error);
            }
        };

        fetchTemplates();
    }, [readTemplates]);

    return templates;
}

export function useCreateTemplate() {
    const [createTemplate] = useCreateTemplateMutation();

    const createNewTemplate = async (data) => {
        try {
            const response = await createTemplate(data);
            console.log(`Use Create Template : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error creating template:", error);
        }
    };

    return createNewTemplate;
}

export function useUpdateTemplate() {
    const [updateTemplate] = useUpdateTemplateMutation();

    const updateExistingTemplate = async (id, data) => {
        try {
            const response = await updateTemplate({ id, ...data });
            console.log(`Use Update Template : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error updating template:", error);
        }
    };

    return updateExistingTemplate;
}

export function useDeleteTemplate() {
    const [deleteTemplate] = useDeleteTemplateMutation();

    const deleteTemplateById = async (id) => {
        try {
            const response = await deleteTemplate(id);
            console.log(`Use Delete Template : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    return deleteTemplateById;
}
