package streams;

import java.util.List;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

enum TaskType {

	READING, CODING, BLOGGING
}

class Task {
    private final String title;
    private final String description;
    private final TaskType type;
    private LocalDate createdOn;
    private Set<String> tags = new HashSet<>();

    public Task(final String title, final TaskType type) {
        this(title, title, type, LocalDate.now());
    }

    public Task(final String title, final TaskType type, final LocalDate createdOn) {
        this(title, title, type, createdOn);
    }

    public Task(final String title, final String description, final TaskType type, final LocalDate createdOn) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.createdOn = createdOn;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskType getType() {
        return type;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public Task addTag(String tag) {
        this.tags.add(tag);
        return this;
    }

    public Set<String> getTags() {
        return Collections.unmodifiableSet(tags);
    }

    @Override
    public String toString() {
        return "Task{" +
                "title='" + title + '\'' +
                ", type=" + type +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(title, task.title) &&
                Objects.equals(type, task.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, type);
    }
}

class DataUtils {

    public static List<Task> getTasks() {
        Task task1 = new Task("Read Java 8 in action", TaskType.READING, LocalDate.of(2015, Month.SEPTEMBER, 20)).addTag("java").addTag("java8").addTag("books");
        Task task2 = new Task("Write factorial program in Haskell", TaskType.CODING, LocalDate.of(2015, Month.SEPTEMBER, 20)).addTag("program").addTag("haskell").addTag("functional");
        Task task3 = new Task("Read Effective Java", TaskType.READING, LocalDate.of(2015, Month.SEPTEMBER, 21)).addTag("java").addTag("books");
        Task task4 = new Task("Write a blog on Stream API", TaskType.BLOGGING, LocalDate.of(2015, Month.SEPTEMBER, 21)).addTag("writing").addTag("stream").addTag("java8");
        Task task5 = new Task("Write prime number program in Scala", TaskType.CODING, LocalDate.of(2015, Month.SEPTEMBER, 22)).addTag("scala").addTag("functional").addTag("program");
        return Stream.of(task1, task2, task3, task4, task5).collect(toList());
    }
}

class Java8StreamsExamples {

    public List<String> allReadingTasks(List<Task> tasks) {
        return tasks.stream().
                filter(task -> task.getType() == TaskType.READING).
                sorted(comparing(Task::getCreatedOn)).
                map(Task::getTitle).
                collect(toList());

    }


    public List<String> allReadingTasksSortedByCreatedOnDesc(List<Task> tasks) {
        return tasks.stream().
                filter(task -> task.getType() == TaskType.READING).
                sorted(comparing(Task::getCreatedOn).reversed()).
                map(Task::getTitle).
                collect(toList());

    }

    public List<Task> allDistinctTasks(List<Task> tasks) {
        return tasks.stream().distinct().collect(toList());
    }

    public List<String> topN(List<Task> tasks, int n) {
        return tasks.stream().
                filter(task -> task.getType() == TaskType.READING).
                sorted(comparing(Task::getCreatedOn)).
                map(Task::getTitle).
                limit(n).
                collect(toList());
    }

    public long countAllReadingTasks(List<Task> tasks) {
        return tasks.stream().
                filter(task -> task.getType() == TaskType.READING).
                count();
    }

    public List<String> allDistinctTags(List<Task> tasks) {
        return tasks.stream().flatMap(task -> task.getTags().stream()).distinct().collect(toList());
    }

    public boolean isAllReadingTasksWithTagBooks(List<Task> tasks) {
        return tasks.stream().
                filter(task -> task.getType() == TaskType.READING).
                allMatch(task -> task.getTags().contains("books"));
    }

    public boolean isAnyReadingTasksWithTagJava8(List<Task> tasks) {
        return tasks.stream().
                filter(task -> task.getType() == TaskType.READING).
                anyMatch(task -> task.getTags().contains("java8"));
    }

    public String joinAllTaskTitles(List<Task> tasks) {
        return tasks.stream().
                map(Task::getTitle).
                reduce((first, second) -> first + " *** " + second).
                get();
    }

}

class Example2_Java7 {

    public static void main(String[] args) {
        List<Task> tasks = DataUtils.getTasks();

        List<Task> readingTasks = new ArrayList<>();
        for (Task task : tasks) {
            if (task.getType() == TaskType.READING) {
                readingTasks.add(task);
            }
        }
        Collections.sort(readingTasks, new Comparator<Task>() {
            @Override
            public int compare(Task t1, Task t2) {
                return t1.getTitle().length() - t2.getTitle().length();
            }
        });
        for (Task readingTask : readingTasks) {
            System.out.println(readingTask.getTitle());
        }
    }
}

class Example2_Java8ProcessingStream {

    public static void main(String[] args) {
        List<Task> tasks = DataUtils.getTasks();

        List<String> readingTasks = tasks.stream()
                .filter(task -> task.getType() == TaskType.READING)
                .sorted((t1, t2) -> t1.getTitle().length() - t2.getTitle().length())
                .map(Task::getTitle)
                .collect(Collectors.toList());

        readingTasks.forEach(System.out::println);

	System.out.println("\n ======= Java 8 Processing Streams addition samples:");
	
	Java8StreamsExamples myStreams = new Java8StreamsExamples();
	
	System.out.println("\n ======= All Distinct Tags:");
	List<String> allDistTags = myStreams.allDistinctTags(DataUtils.getTasks());
	allDistTags.forEach(System.out::println);

	System.out.println("\n ======= Top 2 Reading Tasks:");
	List<String> top2ReadingTasks = myStreams.topN(DataUtils.getTasks(), 2);
	top2ReadingTasks.forEach(System.out::println);

    }
}

