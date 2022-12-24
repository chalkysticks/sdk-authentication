import ModelUser from '../src/Model/User';

const model: ModelUser = new ModelUser({
    id: 1,
    name: 'Matt Kenefick',
    slug: 'matt-kenefick',
    phone: '9174505331',
    lat: 40.788,
    lon: -73.977,
    status: '',
    last_collection: {
        id: 2961,
        user_id: '1',
        challenger_id: null,
        transaction: '75',
        source: 'collection',
        source_id: '0',
        created_at: '2019-02-16 02:07:10',
        updated_at: '2019-02-16 02:07:10',
    },
    wallet_balance: 2175,
    is_social: false,
    is_facebook: false,
    is_twitter: false,
    games: {
        data: [
            {
                id: 3601,
                group: 'games',
                key: '8ball',
                value: '8 Ball',
            },
            {
                id: 3602,
                group: 'games',
                key: '9ball',
                value: '9 Ball',
            },
            {
                id: 3603,
                group: 'games',
                key: '10ball',
                value: '10 Ball',
            },
            {
                id: 3604,
                group: 'games',
                key: 'banks',
                value: 'Bank Pool',
            },
            {
                id: 3605,
                group: 'games',
                key: 'snooker',
                value: 'Snooker',
            },
        ],
    },
    media: {
        data: [
            {
                id: 30,
                type: 'image',
                url: 'https://chalkysticks-cms.s3.amazonaws.com/user-photo-1-2080.jpg',
                created_at: '2016-02-09 04:06:02',
                updated_at: '2016-02-09 04:06:02',
            },
            {
                id: 31,
                type: 'image',
                url: 'https://chalkysticks-cms.s3.amazonaws.com/user-photo-1-6438.jpg',
                created_at: '2016-02-09 04:06:20',
                updated_at: '2016-02-09 04:06:20',
            },
            {
                id: 32,
                type: 'image',
                url: 'https://chalkysticks-cms.s3.amazonaws.com/user-photo-1-9308.jpg',
                created_at: '2016-02-09 04:07:23',
                updated_at: '2016-02-09 04:07:23',
            },
        ],
    },
    meta: {
        data: [
            {
                id: 1,
                group: 'profile',
                key: 'talent_level',
                value: '15',
            },
            {
                id: 2,
                group: 'profile',
                key: 'brief_bio',
                value: 'You can win vicariously through me.',
            },
            {
                id: 3,
                group: 'profile',
                key: 'beacon_distance',
                value: '60',
            },
            {
                id: 10,
                group: 'profile',
                key: 'last_location',
                value: 'New York, NY',
            },
            {
                id: 11,
                group: 'profile',
                key: 'beacons_sent',
                value: '250',
            },
            {
                id: 2257,
                group: 'profile',
                key: 'hometown',
                value: 'Manhattan',
            },
            {
                id: 2616,
                group: 'profile',
                key: 'autocheckin',
                value: '0',
            },
        ],
    },
});

export default model;
