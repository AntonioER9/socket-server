import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async () => {
  main();
})();


function main() {

  const server = new Server({ //servidor de express
    port: envs.PORT,
    // routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app); //servidor del websocket
  WssService.initWss({ server: httpServer });

  
  httpServer.listen(envs.PORT, () => { //levantando el web socket
    console.log(`Server running on port: ${envs.PORT}`);
  })
  
  server.setRoutes(AppRoutes.routes); //levantando el servidor de express
}