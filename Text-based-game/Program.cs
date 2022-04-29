using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

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
            //List of choices in individual events.
            var eventChoices = new List<Choice>();

            //Reading events file and then splitting it.
            string eventsPath = "Events.txt";
            string eventsText = File.ReadAllText(eventsPath);
            string[] eventGroups = eventsText.Split("\r\n\r");

            string choicesPath = "Choices.txt";
            string choicesText = File.ReadAllText(choicesPath);
            string[] choicesGroup = choicesText.Split("\n\r");

            //Game intro.
            Console.WriteLine("A lone thief has set up camp in a forest. Less than a day away has a dragon made its lair.\nThe thief has gathered what confidence they could find and has made it this far...\nWill their confidence grow or fallter? Will the dragon spot them or will they go unseen...\nOnly time will tell...");
            Console.WriteLine("\nPress any button to commence with the theft.");
            Console.ReadLine();

            //Using regex to find individual items in the events file.
            Match eventName = Regex.Match(eventGroups[0], "Name: (.*)\\n");
            Match eventNarration = Regex.Match(eventGroups[0], "Narration: (.*)\\n");
            Match eventSpecialItem = Regex.Match(eventGroups[0], "Special item: (.*)\\n");

            //Event class definition
            var newEvent = new Event();
            newEvent.Name = eventName.Groups[1].Value;
            newEvent.Narration = eventNarration.Groups[1].Value;
            newEvent.SpecialItem = eventSpecialItem.Groups[1].Value;
            newEvent.Choices = eventChoices;

            //Using regex to find individual items in the choice file.
            Match choiceInfo = Regex.Match(choicesGroup[0], "\\d\\.(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)\\n.*:(.*)");

            //Convert numerical string into int.
            int intConfidenceAlteration = Int32.Parse(choiceInfo.Groups[3].Value);
            int intAlarmLevelAlteration = Int32.Parse(choiceInfo.Groups[4].Value);
            int intMinimumConfidence = Int32.Parse(choiceInfo.Groups[5].Value);

            //Choice class definition
            var choices = new Choice();
            choices.Name = choiceInfo.Groups[1].Value;
            choices.Narration = choiceInfo.Groups[2].Value;
            choices.ConfidenceAlteration = intConfidenceAlteration;
            choices.AlarmLevelAlteration = intAlarmLevelAlteration;
            choices.MinimumConfidence = intMinimumConfidence;
            choices.EventRequirement = choiceInfo.Groups[6].Value;

            //Clearing previous text and output UI.
            Console.Clear();
            Console.WriteLine($"Confidence:{confidence} Alarm Level:{alarmLevel}\n");
            Console.WriteLine(newEvent.Narration);

            //Creating loops (3, 1 foreach with 2 indented loops for events and choices).

            choosenEntrance = Console.ReadLine();

        }
    }
}
