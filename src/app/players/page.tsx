'use client';
import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';
import { getPlayers } from '@/app/utils/api/api';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import { PlayerDTO } from '@/lib/generated';
// import { isValidURL } from '@/app/utils/string';
import { Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'avatarUrl', headerName: 'Avatar', width: 130 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'email', headerName: 'email', width: 130 },
  { field: 'deleted', headerName: 'deleted', width: 130 },
];

const paginationModel = { page: 0, pageSize: 5 };

const PlayersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<PlayerDTO[] | undefined>(undefined);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      const playersData = await getPlayers();
      if (playersData?.length) {
        setPlayers(playersData);
      } else {
        console.error('Error fetching players');
      }
      setIsLoading(false);
    };

    fetchPlayers();
  }, []);

  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col gap-4 px-6 pt-20">
        {isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Loader />
          </div>
        )}

        {!isLoading && players && (
          <>
            <span className="text-3xl font-bold">Players</span>
            <Paper sx={{ height: 400, width: '90%' }}>
              <DataGrid
                rows={players}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                sx={{ border: 0 }}
              />
            </Paper>
          </>
        )}

        {!isLoading && !players && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl font-bold">No players found</span>
          </div>
        )}
      </div>
    </ComposedLayout>
  );
};
export default PlayersPage;
