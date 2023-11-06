import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readTemplate, readTemplates, createTemplate, deleteTemplate, updateTemplate } from "../api/Templates";

export function useFetchTemplate(id) {
    const [templateData, setTemplateData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await readTemplate(id, accessToken);
                setTemplateData(response);
            } catch (error) {
                console.error("Error fetching template data:", error);
            }
        };

        if (id) {
            fetchTemplate();
        }
    }, [id, accessToken]);

    return templateData;
}

export function useFetchTemplates() {
    const [templates, setTemplates] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await readTemplates(accessToken);
                setTemplates(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchTemplates();
    }, [accessToken]);

    return templates;
}

export function useCreateTemplate() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewTemplate = async (data) => {
        try {
            const response = await createTemplate(data, accessToken);
            return response;
        } catch (error) {
            console.error("Error creating template:", error);
        }
    };

    return createNewTemplate;
}

export function useUpdateTemplate() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingTemplate = async (id, data) => {
        try {
            const response = await updateTemplate(id, data, accessToken);
            return response;
        } catch (error) {
            console.error("Error updating template:", error);
        }
    };

    return updateExistingTemplate;
}

export function useDeleteTemplate() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteTemplateById = async (id) => {
        try {
            const response = await deleteTemplate(id, accessToken);
            return response;
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    return deleteTemplateById;
}
