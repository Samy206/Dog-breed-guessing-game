using System.Diagnostics;
using DogBreedGuessingGame.Models;
using DogBreedGuessingGame.Service;
using Microsoft.AspNetCore.Mvc;

namespace DogBreedGuessingGame.Controllers
{
    public class HomeController : Controller
    {

        private readonly ILogger _logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger("Controller");
        private readonly DogService dogService = new();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetDog()
        {   
            Dog returnedDog = await dogService.GetDog();
            _logger.LogInformation("Returned dog url : {url}", returnedDog.PictureURL);
            return Ok(returnedDog);

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
