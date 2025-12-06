import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllCourses } from '@/redux/jobSlice'; // Assuming this exists in jobSlice.js

const useGetAllCourses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const dummyCourses = [
        {
          _id: '1',
          title: 'React Basics',
          author: 'John Doe',
          duration: '3h',
          level: 'Beginner',
          image: '/placeholder.svg',
          featured: true,
          trending: false,
          new: true,
          topPick: true,
        },
        // Add more dummy data or integrate with API
      ];
      dispatch(setAllCourses(dummyCourses));
    };
    fetchCourses();
  }, [dispatch]);
};

export default useGetAllCourses;
