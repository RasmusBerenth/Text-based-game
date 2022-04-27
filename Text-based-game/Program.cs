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
    }
    class Choice
    {
        public int MinimumConfidence;
        public int ConfidenceAlteration;
        public int AlarmLevelAlteration;
        public string EventRequirement;
        public string Narration;
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            //Declaring resource,target counter and lists.
            int confidence = 1;
            int alarmLevel = 0;
            //List of events the player has cleared.
            var storyline = new List<Event>();
            //List of special item player has gained.
            var inventory = new List<string>();

            string eventsPath = File.ReadAllText("Events.txt");
            string[] seperetEvents = eventsPath.Split("\r\n");

            var selectEntrance = new Event();
            selectEntrance.Name = seperetEvents[0];
            selectEntrance.Narration = seperetEvents[1];

            //Game intro.
            Console.WriteLine("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair.\nThe thief has gathered what confidence they could find and has made it this far...\nWill their confidence grow or fallter? Will the dragon spot them or will they go unseen...\nOnly time will tell...");
            Console.WriteLine("\nPress any button to commence with the theft.");
            Console.ReadLine();

            //Clearing previous text and output UI.
            Console.Clear();
            Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
            Console.WriteLine(selectEntrance.Narration);


        }
    }
}
