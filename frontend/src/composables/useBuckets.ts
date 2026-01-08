import { computed } from 'vue';
import { useProjects, type Bucket } from './useProjects';

export function useBuckets() {
    const { projects, updateProject } = useProjects();

    const getBucketsByProject = (projectId: number) => {
        const project = projects.value.find(p => p.id === projectId);
        return project?.buckets || [];
    };

    const addBucket = (projectId: number, name: string) => {
        const project = projects.value.find(p => p.id === projectId);
        if (project) {
            const newBucket: Bucket = {
                id: Date.now(),
                projectId,
                name,
                position: project.buckets.length
            };
            project.buckets.push(newBucket);
        }
    };

    const updateBucket = (projectId: number, bucketId: number, updates: Partial<Bucket>) => {
        const project = projects.value.find(p => p.id === projectId);
        if (project) {
            const bucketIndex = project.buckets.findIndex(b => b.id === bucketId);
            if (bucketIndex !== -1) {
                project.buckets[bucketIndex] = { ...project.buckets[bucketIndex], ...updates };
            }
        }
    };

    const deleteBucket = (projectId: number, bucketId: number) => {
        const project = projects.value.find(p => p.id === projectId);
        if (project) {
            project.buckets = project.buckets.filter(b => b.id !== bucketId);
            // Reorder positions
            project.buckets.forEach((bucket, index) => {
                bucket.position = index;
            });
        }
    };

    return {
        getBucketsByProject,
        addBucket,
        updateBucket,
        deleteBucket
    };
}
