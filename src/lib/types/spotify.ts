export type UserProfile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
};

export type Image = {
    url: string;
    height: number;
    width: number;
};

export type Tracks = {
    track_name: string;
};

export type Artist = {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    images: Image[];
};

export type TopArtists = {
    items: Artist[];
    total: number;
    limit: number;
    offset: number;
    previous: string | null;
    next: string | null;
}

export type Track = {
    album: {
        album_type: string;
        artists: Artist[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        images: Image[];
    };
    artists: Artist[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    popularity: number;
};

export type TopTracks = {
    items: Track[];
    total: number;
    limit: number;
    offset: number;
    previous: string | null;
    next: string | null;
};
