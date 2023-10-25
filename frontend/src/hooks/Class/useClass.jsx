import { useEffect, useState } from "react";
import { readClass, readClasses } from "../../api/Classes";

export function useFetchClass(id) {
    const [classData, setClassData] = useState(null);
  
    useEffect(() => {
      const fetchClass = async () => {
        try {
          const response = await readClass(id);
          setClassData(response);
        } catch (error) {
          console.error("Error fetching class data:", error);
        }
      };
  
      fetchClass();
    }, [id]);
  
    return classData;
  }

export function useFetchClasses() {
    const [classes, setClasses] = useState([]);

    useEffect (() => {
        const fetchClasses = async () => {
            try {
                const response = await readClasses();
                setClasses(response);
            } catch (error) {
                console.log(error.response);
            }
        };
    
        fetchClasses();
    }, []);

    return classes;
}