using DogBreedGuessingGame.Models;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;

namespace DogBreedGuessingGame.Service
{
    public class DogService
    {
        private readonly HttpClient _httpClient = new();

        public async Task<Dog> GetDog() {

            string response = await _httpClient.GetStringAsync("https://dog.ceo/api/breeds/image/random");
            //string? json = await response.Content.ReadAsStringAsync();
               
            if(response == null)
            {
                return null;
            }

            Console.WriteLine(response);
            JObject values = JObject.Parse(response);

            // Something like "https://images.dog.ceo/breeds/mexicanhairless/n02113978_605.jpg" => utiliser une regex ?
            string? uriString = JObject.Parse(response).Value<String>("message").ToString();
            Uri uri = new Uri(uriString);
            string breed = uriString.Split('/')[4];

            Dog dog = new Dog("Jack", breed, uri)
            {
                Breed = breed,
                PictureURL = uri
            };
            

            return dog;

        }

    }
}
