import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readCategory, readCategories, createCategory, deleteCategory, updateCategory } from "../api/Categories";

export function useFetchCategory(id) {
    const [categoryData, setCategoryData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);
    
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await readCategory(id, accessToken);
                setCategoryData(response);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };
    
        if (id) {
            fetchCategory();
        }
    }, [id, accessToken]);
    
    return categoryData;
}

export function useFetchCategories() {
    const [categories, setCategories] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect (() => {
        const fetchCategories = async () => {
        try {
                const response = await readCategories(accessToken);
                setCategories(response);
        } catch (error) {
                console.log(error.response);
            }
        };

        fetchCategories();
    }, [accessToken]);

    return categories;
}

export function useCreateCategory() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewCategory = async (data) => {
        try {
            const response = await createCategory(data, accessToken);
            return response;
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    return createNewCategory;
}

export function useUpdateCategory() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingCategory = async (id, data) => {
        try {
            const response = await updateCategory(id, data, accessToken);
            return response;
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return updateExistingCategory;
}

export function useDeleteCategory() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteCategoryById = async (id) => {
        try {
            const response = await deleteCategory(id, accessToken);
            return response;
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return deleteCategoryById;
}
