export const ImagesArrayExample = [
  {
    projectId: 'f37f7c8b-ea5e-4df9-80cb-a12f8045bd99',
    title: 'space.2',
    author: 'creator creator',
    price: '15$',
    originalUrl:
      'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/a83c07cc-4235-41fd-a88c-c1eaf771713c-space.2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240718%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240718T133404Z&X-Amz-Expires=3600&X-Amz-Signature=4d7bc2c3615b8d1ad237d572e08ac92854dc5b56e736f67dbd4aa08cafc55ffd&X-Amz-SignedHeaders=host&x-id=GetObject',
    thumbnailUrl:
      'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-ec51f7dd-492c-482b-9f73-b4aa1430ff70-space.2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240718%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240718T133404Z&X-Amz-Expires=3600&X-Amz-Signature=3e8cbb4b00dedf0504cabcf65e633b5c874523a53e255037414b804c35ed4ab8&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    projectId: 'f37f7c8b-ea5e-4df9-80cb-a12f8045bd99',
    title: 'top2v',
    author: 'creator creator',
    price: '15$',
    originalUrl:
      'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/ccf6ec71-5b0e-4a02-9c60-043e5e279002-top2v.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240718%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240718T133337Z&X-Amz-Expires=3600&X-Amz-Signature=f6e9fb0f4653e078c8c6bf7a018b279a3ea8bf5e5075fd94c6e3801b916a41bb&X-Amz-SignedHeaders=host&x-id=GetObject',
    thumbnailUrl:
      'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-a5a392d7-13a5-4869-9be4-15ea361c7211-top2v.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240718%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240718T133337Z&X-Amz-Expires=3600&X-Amz-Signature=81fc8e46930dabf7473df14cf71edcff9bc69e4d151ef7774c24c69987b2c3c1&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
];

export const GetOneFullProjectExample = {
  id: 'f37f7c8b-ea5e-4df9-80cb-a12f8045bd99',
  title: 'Project 1',
  description: 'description 1',
  ownerId: 'b5ea4f61-dcca-4296-95d7-45e73ee57a35',
  createdAt: '2024-07-18T12:27:29.830Z',
  updatedAt: '2024-07-18T12:27:29.830Z',
  images: [
    {
      id: '21acbc01-ff6e-4b1c-81ff-e4888fbda927',
      title: 'space.2',
      author: 'creator creator',
      price: '15$',
      originalKey: 'e2d88bb6-86b8-4446-a9d2-35d1bf2d9ddd-space.2.jpg',
      thumbnailKey:
        'thumbnail-d607caca-1046-463b-87c8-23f4ba3a3c35-space.2.jpg',
      originalUrl:
        'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/e2d88bb6-86b8-4446-a9d2-35d1bf2d9ddd-space.2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240719%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240719T082722Z&X-Amz-Expires=3600&X-Amz-Signature=7f63922e6e3338dabb427cd757c5e6d6a72dc914ad7f701d44ca27d571de6aac&X-Amz-SignedHeaders=host&x-id=GetObject',
      thumbnailUrl:
        'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-d607caca-1046-463b-87c8-23f4ba3a3c35-space.2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240719%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240719T082723Z&X-Amz-Expires=3600&X-Amz-Signature=46dc5fe8e00057c4fdba65b580e1227714c65fe2cc5b27c645cd84ae0d34c9ad&X-Amz-SignedHeaders=host&x-id=GetObject',
      projectId: 'f37f7c8b-ea5e-4df9-80cb-a12f8045bd99',
      createdAt: '2024-07-19T08:12:54.944Z',
      updatedAt: '2024-07-19T08:12:54.944Z',
    },
    {
      id: '63988f2f-a45f-4156-9340-15e159835306',
      title: 'top2v',
      author: 'creator creator',
      price: '15$',
      originalKey: '14a58d39-8f88-4a40-965b-fc587aee27bd-top2v.jpg',
      thumbnailKey: 'thumbnail-ae65db14-b590-4dad-ac7c-f25928309a73-top2v.jpg',
      originalUrl:
        'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/14a58d39-8f88-4a40-965b-fc587aee27bd-top2v.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240719%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240719T082722Z&X-Amz-Expires=3600&X-Amz-Signature=690a823dc33ee0cdad0ddd00174087711cdd2d2270a7d3696e346e2783249b69&X-Amz-SignedHeaders=host&x-id=GetObject',
      thumbnailUrl:
        'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-ae65db14-b590-4dad-ac7c-f25928309a73-top2v.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240719%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240719T082723Z&X-Amz-Expires=3600&X-Amz-Signature=99f54cd52f5a8bdfab396c6353e2a293ec1d3844d941bb6b08d961a8650463b3&X-Amz-SignedHeaders=host&x-id=GetObject',
      projectId: 'f37f7c8b-ea5e-4df9-80cb-a12f8045bd99',
      createdAt: '2024-07-19T08:12:45.716Z',
      updatedAt: '2024-07-19T08:12:45.716Z',
    },
  ],
  author: 'creator creator',
};

export const ResortImagesReqExample = {
  imageOrderArr: [
    {
      imageId: '19d0ce77-d685-48de-9689-fc7bf38f4de4',

      orderIndex: 5,
    },
    {
      imageId: 'af618d70-a574-465e-81c8-ae88cf335f8b',

      orderIndex: 2,
    },
    {
      imageId: 'a9ab0fc7-8528-4cf4-b157-1cd9b0598044',

      orderIndex: 4,
    },
    {
      imageId: '107a2793-2cc1-4861-b45f-0709491de1a8',

      orderIndex: 1,
    },
    {
      imageId: '061e4f8a-744b-47e7-8c14-259eb86e4647',

      orderIndex: 3,
    },
  ],
};

export const GetAllProjectsExample = [
  {
    id: 'd432b629-a230-4fc8-933b-b5f7763e27c9',
    title: 'Project 02',
    description: 'Studio 02',
    ownerId: '40dc0c79-e6fc-480c-bb7a-ef21764dc20d',
    createdAt: '2024-08-01T23:15:48.768Z',
    updatedAt: '2024-08-01T23:16:00.930Z',
    images: [
      {
        id: '63bf3a31-299c-45a1-86ca-f31fcc852a35',
        title: 'Kaye_0486_HR',
        author: 'Timothy Kaye',
        price: '15$',
        orderIndex: 8,
        originalKey: '1c4e92e9-99cc-47f8-a50d-f3ba4dd79fd6-Kaye_0486_HR.jpg',
        thumbnailKey:
          'thumbnail-e567c565-c585-4e34-ab7b-bfee03b6114d-Kaye_0486_HR.jpg',
        originalUrl: null,
        thumbnailUrl:
          'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-e567c565-c585-4e34-ab7b-bfee03b6114d-Kaye_0486_HR.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240802%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240802T121455Z&X-Amz-Expires=3600&X-Amz-Signature=d3b8d9317f707ee91fc0f71f69988cca29fd272607267b4be244294197d6aaea&X-Amz-SignedHeaders=host&x-id=GetObject',
        projectId: 'd432b629-a230-4fc8-933b-b5f7763e27c9',
        createdAt: '2024-08-01T23:16:09.129Z',
        updatedAt: '2024-08-01T23:16:09.129Z',
      },
    ],
  },
  {
    id: '8d025d5a-774d-4658-8298-9ddeb00ba5be',
    title: 'Project 01',
    description: 'Studio 01',
    ownerId: '40dc0c79-e6fc-480c-bb7a-ef21764dc20d',
    createdAt: '2024-08-01T23:14:09.604Z',
    updatedAt: '2024-08-01T23:14:31.776Z',
    images: [
      {
        id: '8d0c129b-629a-4319-bb8f-93fc09127c7a',
        title: 'Kaye_1142_HR',
        author: 'Timothy Kaye',
        price: '15$',
        orderIndex: 10,
        originalKey: 'fa7e4e23-e91b-4d17-b92e-5274f57990a4-Kaye_1142_HR.jpg',
        thumbnailKey:
          'thumbnail-a67e9114-e2de-4e0a-b890-9088acf18842-Kaye_1142_HR.jpg',
        originalUrl: null,
        thumbnailUrl:
          'https://image-storage-001.s3.ap-southeast-2.amazonaws.com/thumbnail-a67e9114-e2de-4e0a-b890-9088acf18842-Kaye_1142_HR.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3FLD6J5TDPHLQKKX%2F20240802%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240802T121455Z&X-Amz-Expires=3600&X-Amz-Signature=28136dfcd938aa6310dfbcad77b750430243cfcb6ac90275d08ccd8287f86b8d&X-Amz-SignedHeaders=host&x-id=GetObject',
        projectId: '8d025d5a-774d-4658-8298-9ddeb00ba5be',
        createdAt: '2024-08-01T23:14:40.438Z',
        updatedAt: '2024-08-01T23:14:40.438Z',
      },
    ],
  },
];

export const SearchProjectsExample = [
  {
    id: 'dd182f42-0a1d-4ee0-857f-0ad3e250476b',
    title: 'Project Name1',
    description: 'Studio Name',
    ownerId: 'ff22d411-d867-442b-9a91-c0f6bc4c48c6',
    createdAt: '2024-08-02T12:27:20.258Z',
    updatedAt: '2024-08-02T12:27:24.576Z',
    images: [
      {
        id: '3a5ffca0-673c-4eec-977c-6c76e362fec1',
        title: 'intttt2',
        author: 'creator222 creator222',
        price: '15$',
        orderIndex: 1,
        originalKey: '563860f7-f41f-4a59-8016-0d02f3856c30-intttt2.jpeg',
        thumbnailKey:
          'thumbnail-fea0873e-f98d-4069-a2bd-c301341ef9a5-intttt2.jpeg',
        originalUrl: null,
        thumbnailUrl: null,
        projectId: 'dd182f42-0a1d-4ee0-857f-0ad3e250476b',
        createdAt: '2024-08-02T12:27:28.183Z',
        updatedAt: '2024-08-02T12:27:28.183Z',
      },
    ],
  },
  {
    id: 'd432b629-a230-4fc8-933b-b5f7763e27c9',
    title: 'Project 02',
    description: 'Studio 02',
    ownerId: '40dc0c79-e6fc-480c-bb7a-ef21764dc20d',
    createdAt: '2024-08-01T23:15:48.768Z',
    updatedAt: '2024-08-01T23:16:00.930Z',
    images: [
      {
        id: '63bf3a31-299c-45a1-86ca-f31fcc852a35',
        title: 'Kaye_0486_HR',
        author: 'Timothy Kaye',
        price: '15$',
        orderIndex: 8,
        originalKey: '1c4e92e9-99cc-47f8-a50d-f3ba4dd79fd6-Kaye_0486_HR.jpg',
        thumbnailKey:
          'thumbnail-e567c565-c585-4e34-ab7b-bfee03b6114d-Kaye_0486_HR.jpg',
        originalUrl: null,
        thumbnailUrl: null,
        projectId: 'd432b629-a230-4fc8-933b-b5f7763e27c9',
        createdAt: '2024-08-01T23:16:09.129Z',
        updatedAt: '2024-08-01T23:16:09.129Z',
      },
    ],
  },
];
