// import { useToast } from "@/components/ui/use-toast";
// import {
//   InfiniteData,
//   QueryFilters,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { SubmitPost } from "./actions";
// import { PostPage } from "@/lib/types";
// import { EnhancedToast } from "../../Toast";

// export function useSubmitMutationPost() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: SubmitPost,
//     onSuccess: async (newPost) => {
//       const queryFilter: QueryFilters = {
//         queryKey: ["for-you"],
//       };
//       await queryClient.cancelQueries(queryFilter);
//       // update cahe
//       queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
//         queryFilter,
//         (oldData) => {
//           const firstPage = oldData?.pages[0];
//           if (firstPage) {
//             return {
//               pageParams: oldData.pageParams,
//               pages: [
//                 {
//                   posts: [newPost, ...firstPage.posts],
//                   nextCursor: firstPage.nextCursor,
//                 },
//                 ...oldData.pages.slice(1),
//               ],
//             };
//           }
//         }
//       );
//       toast({
//         title: "Success",
//         description: "Post created successfully",
//         action: (
//           <EnhancedToast
//             variant="default"
//             title="Success"
//             description="Post created successfully"
//           />
//         ),
//       });
//     },
//     onError(error, variables, context) {
//       console.log(error);
//       toast({
//         variant: "destructive",
//         description: "falid to post, pls try again",
//       });
//     },
//   });
//   return mutation;
// }
import { toast, useToast } from "@/components/ui/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { SubmitPost, deletePost, followUser, unfollowUser } from "./actions";
import { PostPage } from "@/lib/types";
import { EnhancedToast } from "@/components/Toast";
import { Toast } from "@/components/ui/toast";
import { User } from "@prisma/client";

export function useSubmitMutationPost() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: SubmitPost,

    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = {
        queryKey: ["for-you"],
      };
      await queryClient.cancelQueries(queryFilter);

      // update cache
      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
      toast({
        action: (
          <EnhancedToast
            variant="default"
            title="Success"
            description="Post created successfully"
          />
        ),
        style: {
          padding: 0,
        },
        duration: 2000,
      });
    },
    onError(error, variables, context) {
      console.log(error);
      toast({
        style: {
          padding: 0,
        },
        duration: 2000,
        action: (
          <EnhancedToast
            title="Error"
            description="Failed to post, please try again"
            variant="destructive"
          />
        ),
      });
    },
  });

  return mutation;
}
export function useDeleteMutationPost() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      const queryFilter: QueryFilters = {
        queryKey: ["for-you"],
      };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (oldData) {
            const newPages = oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.filter(
                (post) => post.id !== mutation.variables
              ),
            }));
            return {
              ...oldData,
              pages: newPages,
            };
          }
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        action: (
          <EnhancedToast
            variant="default"
            title="Success"
            description="Post deleted successfully"
          />
        ),
        style: {
          padding: 0,
        },
        duration: 2000,
      });
    },
    onError(error) {
      console.log(error);
      toast({
        style: {
          padding: 0,
        },
        duration: 2000,
        action: (
          <EnhancedToast
            title="Error"
            description="Failed to delete post, please try again"
            variant="destructive"
          />
        ),
      });
    },
  });

  return mutation;
}

export function useFollowMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: async (data, variables) => {
      const queryFilter: QueryFilters = {
        queryKey: ["friendFollow"],
      };
      await queryClient.cancelQueries(queryFilter);
      
      // Update the cache to reflect the new follow status
      queryClient.setQueryData(["friendFollow"], (oldData:any) => {
        if (oldData) {
          return oldData.map((user: any) => 
            user.id === variables ? { ...user, isFollowing: true } : user
          );
        }
        return oldData;
      });

      toast({
        action: (
          <EnhancedToast
            variant="default"
            title="Success"
            description="User followed successfully"
          />
        ),
        style: {
          padding: 0,
        },
        duration: 2000,
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        style: {
          padding: 0,
        },
        duration: 2000,
        action: (
          <EnhancedToast
            title="Error"
            description="Failed to follow user, please try again"
            variant="destructive"
          />
        ),
      });
    },
  });

  return mutation;
}

export function useUnfollowMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: async (data, variables) => {
      
      const queryFilter: QueryFilters = {
        queryKey: ["friendFollow"],
      };
 
      await queryClient.cancelQueries(queryFilter);
      
      // Update the cache to reflect the new unfollow status
      queryClient.setQueryData(["friendFollow"], (oldData:any) => {
        if (oldData) {
          return oldData.map((user: any) => 
            user.id === variables ? { ...user, isFollowing: false } : user
          );
        }
        return oldData;
      });

      toast({
        action: (
          <EnhancedToast
            variant="default"
            title="Success"
            description="User unfollowed successfully"
          />
        ),
        style: {
          padding: 0,
        },
        duration: 2000,
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        style: {
          padding: 0,
        },
        duration: 2000,
        action: (
          <EnhancedToast
            title="Error"
            description="Failed to unfollow user, please try again"
            variant="destructive"
          />
        ),
      });
    },
  });

  return mutation;
}