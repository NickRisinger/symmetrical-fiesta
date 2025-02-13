export const enum SphereType {
    Other = 'Other',
    Coffee = 'Coffee',
};

export const enum SphereName {
    Other = 'Другая сфера',
    Coffee = 'Кофейня',
};

export const enum SphereDescription {
    Other = 'Сфера, которая не попадает в стандартные категории. Может включать уникальные виды деятельности или редкие отрасли.',
    Coffee = 'Управление заведениями общественного питания, такими как кафе, рестораны, бары и кофейни.',
};

export const SPHERES = [
    {
        value: SphereType.Other,
        label: SphereName.Other,
        description: SphereDescription.Other,
    }, {
        value: SphereType.Coffee,
        label: SphereName.Coffee,
        description: SphereDescription.Coffee
    },
];
