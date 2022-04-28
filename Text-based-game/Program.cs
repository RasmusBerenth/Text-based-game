using System;
using System.Collections.Generic;
using System.IO;

namespace Text_based_game
{
    class Event
    {
        public string Name;
        public string Narration;
        public string SpecialItem;
        public List<Choice> Choices;
    }
    class Choice
    {
        public int MinimumConfidence;
        public int ConfidenceAlteration;
        public int AlarmLevelAlteration;
        public string EventRequirement;
        public string Narration;
        public string Name;
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            int confidence = 1;
            int alarmLevel = 0;
            string choosenEntrance;
            string input;

            //List of events the player has cleared.
            var storyline = new List<Event>();
            //List of special item player has gained.
            var inventory = new List<string>();

            //Reading files and then splitting them and puting specific parts into the appropriate classes.
            string eventsPath = File.ReadAllText("Events.txt");
            string[] eventsText = eventsPath.Split("\n");
            string[] eventBlocks = eventsPath.Split("\r");
            string choicePath = File.ReadAllText("Choices.txt");
            string[] separateChoices = choicePath.Split("\n");

            //Event classes
            var newEvent = new Event();
            newEvent.Name = eventsText[0];
            newEvent.Narration = eventsText[1];
            newEvent.SpecialItem = eventsText[2];
            //newEvent.Choices = "";

            //Choice classes

            //Game intro.
            Console.WriteLine("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair.\nThe thief has gathered what confidence they could find and has made it this far...\nWill their confidence grow or fallter? Will the dragon spot them or will they go unseen...\nOnly time will tell...");
            Console.WriteLine("\nPress any button to commence with the theft.");
            Console.ReadLine();

            //Clearing previous text and output UI.
            Console.Clear();
            Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
            Console.WriteLine(newEvent.Name);


        }
    }
}
