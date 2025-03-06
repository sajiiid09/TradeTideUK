# install pnpm if not present
if ! command -v pnpm &> /dev/null
then
    npm install -g pnpm
fi

# install dependencies
pnpm i

# generate prisma client
pnpm run prisma:generate

# run build
pnpm run build

# docker compose up
docker-compose up -d

# pause
echo "Setup complete"
echo "========================================================================"
echo "The web app is available at http://localhost:3000"
echo "The database is available at http://localhost:5432"
echo "The system architecture is available at docker-compose.yml"
echo "Please create a .env file in the root directory copying the .env.example"
echo "========================================================================"
read -p "Press enter to continue"