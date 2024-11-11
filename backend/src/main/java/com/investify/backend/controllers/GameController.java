import com.investify.backend.dtos.GameRequestDto;
import com.investify.backend.dtos.ShareGameRequestDto;
import com.investify.backend.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/create")
    public ResponseEntity<?> createGame(@RequestBody GameRequestDto request) {
        String gameCode = gameService.createGame(request.getCreator(), request.getParameters());
        return ResponseEntity.ok().body("Game created with code: " + gameCode);
    }

    @PostMapping("/share")
    public ResponseEntity<?> shareGameCode(@RequestBody ShareGameRequestDto request) {
        gameService.sendGameCodeByEmail(request.getEmail(), request.getGameCode());
        return ResponseEntity.ok().body("Game code sent to email: " + request.getEmail());
    }

    @PostMapping("/join/{invitationCode}")
    public ResponseEntity<String> joinGame(@PathVariable String invitationCode, @RequestParam UUID clientId) {
        boolean joined = gameService.addClientToGame(invitationCode, clientId);
        if (joined) {
            return ResponseEntity.ok("Successfully joined the game!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid invitation code or game.");
        }
    }
}
