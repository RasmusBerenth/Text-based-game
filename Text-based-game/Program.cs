using System;
using System.Collections.Generic;

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
            int confidence = 1;
            int alarmLevel = 0;
            var storyline = new List<Event>();

            //Game intro
            Console.WriteLine("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair. The thief has gathered what confidence they could find and has made it this far...\nWill their confidence grow or fallter? Will the dragon spot them or will they go unseen...\nOnly time will tell...");
            Console.WriteLine("\nPress any button to commence with the theft.");
            Console.ReadLine();

            //Clearing previous text and output UI
            Console.Clear();
            Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}");


        }
    }
}
