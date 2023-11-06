import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import {
    useReadTemplateQuery,
    useReadTemplatesQuery,
    useCreateTemplateMutation,
    useDeleteTemplateMutation,
    useUpdateTemplateMutation,
} from "../api/Template";

export function useFetchTemplate(id) {
    const [templateData, setTemplateData] = useState(null);

    const { data: template, error, isLoading } = useReadTemplateQuery(id);

    useEffect(() => {
        if (template) {
            setTemplateData(template);
        } else if (error) {
            console.error("Error fetching template data:", error);
        }
    }, [template, error]);

    return templateData;
}

export function useFetchTemplates() {
    const { data: templates, error, isLoading } = useReadTemplatesQuery();

    useEffect(() => {
        if (templates) {
            setTemplates(templates);
        } else if (error) {
            console.error("Error fetching templates data:", error);
        }
    }, [templates, error]);

    return templates;
}

export function useCreateTemplate() {
    const [createTemplate] = useCreateTemplateMutation();

    const createNewTemplate = async (data) => {
        try {
            const response = await createTemplate(data);
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
            return response;
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    return deleteTemplateById;
}
