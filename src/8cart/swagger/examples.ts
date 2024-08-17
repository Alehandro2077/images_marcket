export const GetCartExample = {
  id: '6e9c587a-e4a6-473f-b3b4-ae54c69517e9',
  userId: '37a551f1-8bd0-44af-8f15-021b45d06925',
  cartProject: [
    {
      id: '74e9b957-e989-4860-87de-7abe6635cfc2',
      totalPrice: '30',
      currency: 'AUD',
      project: {
        title: 'Project 22',
      },
      cartProjectImage: [
        {
          id: '8ed296d0-8ccc-47bb-abc2-79358775015b',
          image: {
            id: '28a1de39-8aaa-4b07-b7fe-97d374fc4646',
            title: 'intttt2',
            author: 'creator222 creator surname',
            price: '15',
            currency: 'AUD',
            orderIndex: 1,
            originalKey: '7cb1f7f5-442d-4685-8eff-2ce2c3533f13-intttt2.jpeg',
            thumbnailKey:
              'thumbnail-aaec9409-e0e2-4644-9bca-71bae73cb3f3-intttt2.jpeg',
            originalUrl: null,
            thumbnailUrl: null,
            projectId: 'c2517a8c-0cf3-4e5e-8987-0a7973f988eb',
            createdAt: '2024-08-09T12:08:00.850Z',
            updatedAt: '2024-08-09T12:08:00.850Z',
          },
        },
        {
          id: '27f2cc46-b617-45ff-83a5-c294791ee36a',
          image: {
            id: '5b2de33b-4d10-4194-8f0f-2f5bdaf92e9c',
            title: 'interior2',
            author: 'creator222 creator surname',
            price: '15',
            currency: 'AUD',
            orderIndex: 0,
            originalKey: 'e85800df-16cc-4785-8e5d-90b92ca66fee-interior2.jpeg',
            thumbnailKey:
              'thumbnail-5a3d9a1d-33ab-4183-b1c6-ab1d4428ef00-interior2.jpeg',
            originalUrl: null,
            thumbnailUrl: null,
            projectId: 'c2517a8c-0cf3-4e5e-8987-0a7973f988eb',
            createdAt: '2024-08-09T12:08:00.850Z',
            updatedAt: '2024-08-09T12:08:00.850Z',
          },
        },
      ],
    },
    {
      id: '2e86a6ba-43dd-4490-96e5-0d30b39cfa65',
      totalPrice: '15',
      currency: 'AUD',
      project: {
        title: 'Project1',
      },
      cartProjectImage: [
        {
          id: 'e2f9c2e6-ab9d-4ca0-a2a8-f1c0d1fbe2bc',
          image: {
            id: 'c10cdd0c-9e76-4aab-876d-23c8b625f1f9',
            title: 'in1',
            author: 'creator222 creator surname',
            price: '15',
            currency: 'AUD',
            orderIndex: 0,
            originalKey: '593b988c-613e-43eb-a276-b47f6b501c46-in1.jpeg',
            thumbnailKey:
              'thumbnail-6c2396aa-bf81-459b-9c40-5dfc12aed88a-in1.jpeg',
            originalUrl: null,
            thumbnailUrl: null,
            projectId: '89b430bf-f6e9-40a6-9595-71feaaca5379',
            createdAt: '2024-08-09T12:07:29.971Z',
            updatedAt: '2024-08-09T12:07:29.971Z',
          },
        },
      ],
    },
  ],
};

export const AddItemToCartExample = {
  id: '945c6b6f-cdbd-497a-b8ec-314d6e9c4cfa',
  cartProjectId: '2e86a6ba-43dd-4490-96e5-0d30b39cfa65',
  imageId: 'c0c02668-08b2-472a-88fe-d2f865797ca6',
  createdAt: '2024-08-12T10:58:01.955Z',
  updatedAt: '2024-08-12T10:58:01.955Z',
  image: {
    id: 'c0c02668-08b2-472a-88fe-d2f865797ca6',
    title: 'interior1',
    author: 'creator222 creator surname',
    price: '15',
    currency: 'AUD',
    thumbnailKey:
      'thumbnail-98003803-3a63-4d5d-8637-ea148649789a-interior1.jpg',
    thumbnailUrl:
      'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-98003803-3a63-4d5d-8637-ea148649789a-interior1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240812%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240812T105803Z&X-Amz-Expires=3600&X-Amz-Signature=9687f4dc606e2be6032c05b402a9e0e4b5174628746fddf3d37734c0af0d19b5&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
};
