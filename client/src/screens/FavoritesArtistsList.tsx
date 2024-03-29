import React, { useEffect, useState } from 'react';
import { ScrollView } from "native-base";
import { getAllArtists } from '@services/spotifyService';
import { useArtistContext } from '@contexts/ArtistContext';
import { FavoritesArtists } from '@components/FavoritesArtists';

export function FavoritesArtistsList() {
  const [topArtists, setTopArtists] = useState([]);
  const { selectedArtists, addSelectedArtist } = useArtistContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artists = await getAllArtists();

        setTopArtists(artists || []);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchData();
  }, [selectedArtists]);

  return (
    <ScrollView padding={6} showsVerticalScrollIndicator={false} centerContent>
      {selectedArtists.map((artist, index) => (
        <FavoritesArtists key={index} artist={artist} isInArtistsList={false} />
      ))}
    </ScrollView>
  );
}
