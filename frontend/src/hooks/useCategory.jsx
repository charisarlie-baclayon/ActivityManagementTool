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
                console.log(`Use Get Category By Id : ${JSON.stringify(response, null, 2)}`);
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await readCategories(accessToken);
                console.log(`Use Get All Categories : ${JSON.stringify(response, null, 2)}`);
                setCategories(response);
            } catch (error) {
                console.error("Error fetching categories data:", error);
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
            console.log(`Use Create Category : ${JSON.stringify(response, null, 2)}`);
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
            console.log(`Use Update Category : ${JSON.stringify(response, null, 2)}`);
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
            console.log(`Use Delete Category : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return deleteCategoryById;
}
